
export const dataGridSx = {
  background: "#111",
  color: "#fff",
  border: "none",
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "#111 !important",
    borderBottom: "1px solid #888 !important",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    padding: "6px !important",
  },
  "& .MuiDataGrid-row--borderBottom": {
    borderBottom: "0px solid #888 !important",
  },
  "& .MuiDataGrid-cell": {
    borderTop: "none !important",
    borderBottom: "1px solid #888 !important",
    whiteSpace: "nowrap",
    overflow: "hidden",
    padding:" 0px 10px !important", 
    textOverflow: "ellipsis",
    textAlign: "left",
  },
  "& .css-1ir2opr": {
    outline: "none",
    overflow: "hidden",
  },
  "& .MuiSvgIcon-root": {
    color: "white",
    overflow: "hidden",
  },
  "& .MuiDataGrid-row:hover": {
    backgroundColor: "transparent",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: "bold",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  "& .MuiDataGrid-footerContainer": {
    borderTop: "none !important",
  },
  "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
    display: "none",
  },
  "& .MuiDataGrid-virtualScroller": {
    borderBottom: "none",
    scrollbarWidth: "none", 
    msOverflowStyle: "none", 
  },
  "& .css-1tdeh38": {
      borderTop: "none !important",
  },
  "& .css-1j5bb80-MuiDataGrid-root,.MuiDataGrid-scrollbarFiller": {
    minWidth : "0 !important",
    borderBottom: "none !important",
  },
  "& css-19tm4aw-MuiDataGrid-root, .MuiDataGrid-columnHeaders,.MuiDataGrid-filler": {
   background: "none !important",
  },
  "& .MuiDataGrid-columnSeparator": {
    maxWidth: "0 !important",
  }
};
