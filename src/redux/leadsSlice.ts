import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Lead {
  firstName?: string;
  lastName?: string;
  email?: string;
  country?: string;
  linkedin?: string;
  visas?: string[];
  resume?: string;
  message?: string;
}

interface LeadsState {
  leads: Lead[];
}

const initialState: LeadsState = {
  leads: [],
};

const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    addLead: (state, action: PayloadAction<Lead>) => {
      state.leads.push(action.payload);
    },
  },
});

export const { addLead } = leadsSlice.actions;
export default leadsSlice.reducer;
