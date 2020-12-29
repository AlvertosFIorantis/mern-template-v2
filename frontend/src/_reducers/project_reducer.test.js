import {
  GET_MY_PROJECTS,
  PROJECTS_FAILED,
  CREATE_PROJECT,
  DELETE_PROJECT,
} from "../_actions/constants/ProjectConstants/project_constants";

import project from "./project_reducer";

describe("Project Reducer", () => {
  it("Should return default state", () => {
    // gia na kano test an tha mou giriso deflaut stat afto pou exo na kano einai  na stilo ena action pou den iparxei afto gia afto vazo to undefined. Opote ousiastika to post reducer eiani o reducer pou thelo na tsekaor kai apal tou vazo to undefineid einai to inital state tou reducer  kai to {} san adio payload kai to action pou thelo. Apla epidi exo adio {} den exo perasi oute action oute payload
    // POLI SIMADIKO STO user_reducer.js to initial state mou einai to object pou exo apo kano me token:null,errorMessage:null,userId:null,first_login_verify:false opote an den exo action pou kanei match sto reducer mou thelo na mou kanie retunr to default state
    const newState = project(undefined, {});
    expect(newState).toEqual({ projects: [], error: "" });
  });
  it("Should return new state if receiving action type of   GET_MY_PROJECTS", () => {
    const initialState = { projects: [], error: "" };

    const data = {
      projects: [
        {
          _id: "1",
          projectCategory: "internal-project",
        },
        {
          _id: "2",
          projectCategory: "internal-project",
        },
      ],
    };
    const newState = project(initialState, {
      type: GET_MY_PROJECTS,
      payload: data,
    });
    expect(newState).toEqual({
      projects: [
        {
          _id: "1",
          projectCategory: "internal-project",
        },
        {
          _id: "2",
          projectCategory: "internal-project",
        },
      ],
      error: "",
    });
  });

  it("Should return new state if receiving action type of   DELETE_PROJECT", () => {
    const initialState = {
      projects: [
        {
          _id: "1",
          projectCategory: "internal-project",
        },
        {
          _id: "2",
          projectCategory: "internal-project",
        },
      ],
      error: "",
    };

    const data = { project_id: "1" };
    const newState = project(initialState, {
      type: DELETE_PROJECT,
      payload: data,
    });
    expect(newState).toStrictEqual({
      projects: [
        {
          _id: "2",
          projectCategory: "internal-project",
        },
      ],
      error: "",
    });
  });
  it("Should return new state if receiving action type of   CREATE_PROJECT", () => {
    const initialState = {
      projects: [
        {
          _id: "1",
          projectCategory: "internal-project",
        },
        {
          _id: "2",
          projectCategory: "internal-project",
        },
      ],
      error: "",
    };

    const data = {
      project: {
        _id: "3",
        projectCategory: "internal-project",
      },
    };
    const newState = project(initialState, {
      type: CREATE_PROJECT,
      payload: data,
    });
    expect(newState).toStrictEqual({
      projects: [
        {
          _id: "1",
          projectCategory: "internal-project",
        },
        {
          _id: "2",
          projectCategory: "internal-project",
        },
        {
          _id: "3",
          projectCategory: "internal-project",
        },
      ],
      error: "",
    });
  });
});
