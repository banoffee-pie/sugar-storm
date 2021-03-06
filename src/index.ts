import * as core from '@actions/core';

import {Handler, Handlers} from './handlers/handlers';
import {checkoutBranch} from './git-commands';
import {getCommand, getBranch} from './helpers';
import {init} from './init';
import { AuthorisationError } from './errors';

async function run(): Promise<void> {
  const command: string = getCommand();

  // if just a normal comment -- no command
  if (command === '') return;

  const handler: Handler | null = Handlers.getInstance().selectHandler(command);

  if (handler === null) {
    console.log(`Command not recognised:\n${command}`);
    return;
  }

  try {
    const branch = await getBranch();
    await checkoutBranch(branch);
    await handler.handle(command);
  } catch (e) {
    core.setFailed(`An unexpected error occurred:\n ${e.message}`);
  }
}

init().then(run).catch(reason => {
  if(reason instanceof AuthorisationError) {
    core.warning(reason.message);
    return;
  }
  core.setFailed(reason);
});
