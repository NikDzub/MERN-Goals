import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalService';

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

//Create Goal
export const createGoal = createAsyncThunk(
  'goals/create',
  async (goalText, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const localToken = JSON.parse(localStorage.getItem('user'));
      if (localToken || token === localToken.token) {
        return await goalService.createGoal(goalText, token);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get Goals
export const getGoals = createAsyncThunk(
  'goals/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const localToken = JSON.parse(localStorage.getItem('user'));
      if (localToken || token === localToken.token) {
        return await goalService.getGoals(token);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete Goal
export const deleteGoal = createAsyncThunk(
  'goals/delete',
  async (goalId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const localToken = JSON.parse(localStorage.getItem('user'));
      if (localToken || token === localToken.token) {
        return await goalService.deleteGoal(goalId, token);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Update Goal
export const updateGoal = createAsyncThunk(
  'goals/update',
  async (editText, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const localToken = JSON.parse(localStorage.getItem('user'));
      if (localToken || token === localToken.token) {
        return await goalService.updateGoal(editText, token);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    reset: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    //Create goal
    builder.addCase(createGoal.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createGoal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.goals.push(action.payload);
    });
    builder.addCase(createGoal.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.payload;
    });
    //Get goals
    builder.addCase(getGoals.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getGoals.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.goals = action.payload;
    });
    builder.addCase(getGoals.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.payload;
      state.goals = [];
    });
    //Delete goal
    builder.addCase(deleteGoal.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteGoal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.goals = state.goals.filter((goal) => {
        return goal._id !== action.payload.removed;
      });
    });
    builder.addCase(deleteGoal.rejected, (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = action.payload;
      state.goals = [];
    });
    //Update goal
    builder.addCase(updateGoal.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateGoal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.goals = state.goals.map((goal) => {
        goal._id === action.payload._id &&
          (goal.goalText = action.payload.goalText);
        return goal;
      });
    });
    builder.addCase(updateGoal.rejected, (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = action.payload;
      state.goals = [];
    });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
