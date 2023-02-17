import React from 'react';

import { todoItem } from './todoitem';

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'todoItem',
    component: todoItem,
};

export const Primary = () => <todoItem />;