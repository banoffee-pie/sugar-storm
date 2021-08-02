/*
* Contains helper functions to determine if a commenter is authorised to run commands
* */

import {context} from '@actions/github';

export enum commentAuthorAssoc {
    COLLABORATOR = 'COLLABORATOR',
    CONTRIBUTOR = 'CONTRIBUTOR',
    FIRST_TIMER = 'FIRST_TIMER',
    FIRST_TIME_CONTRIBUTOR = 'FIRST_TIME_CONTRIBUTOR',
    MANNEQUIN = 'MANNEQUIN',
    MEMBER = 'MEMBER',
    NONE = 'NONE',
    OWNER = 'OWNER',
}

