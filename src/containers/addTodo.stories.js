import React from "react";
import AddTodo from "./addTodo";
export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'input',
    component: AddTodo,
};

export const addTodo = () => <AddTodo />;