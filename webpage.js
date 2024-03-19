let gridApi;
// Grid Options: Contains all of the grid configurations
/** @type {import('ag-grid-community').GridOptions} */
const gridOptions = {
    // Row Data: The data to be displayed.
    rowData: [
        { "Work Order #": "1", Category: "Plumetting", Status: 64950 },
        { "Work Order #": "2", Category: "Plumetting", Status: 33850 },
        { "Work Order #": "3", Category: "Plumetting", Status: 29600 },
        { "Work Order #": "4", Category: "Plumetting", Status: 48890 },
        { "Work Order #": "5", Category: "Plumetting", Status: 15774 },
        { "Work Order #": "6", Category: "Plumetting", Status: 20675 },
    ],
    // Column Definitions: Defines the columns to be displayed.
    columnDefs: [
        { field: "Work Order #" },
        { field: "Category" },
        { field: "Status" },
        { field: "View detail" },
    ],
};

// Create Grid: Create new grid within the #myGrid div, using the Grid Options object
gridApi = agGrid.createGrid(document.querySelector("#myGrid"), gridOptions);
