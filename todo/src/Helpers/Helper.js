
export function getURL(){
    // Pull the url path and location.
    const location = window.location.href;
    var urlDisplayType = location.substring(location.indexOf("#")+2);
    switch (urlDisplayType){
      case "active":
        urlDisplayType = "Active"
        break;
      case "completed":
        urlDisplayType = "Completed"
        break;
      default:
        urlDisplayType = "All"
    }
    return urlDisplayType
}



export const ACTIONS = {
    "ADD": "NEW_TODO",
    "DELETE": "DELETE_TODO",
    "UPDATE_DT": "UPDATE_DISPLAYTYPE",
    "DONE": "COMPLETE_TODO",
    "ALL_DONE": "ALL_COMPLETE",
    "CLEAR_COMPLETED": "CLEAR_COMPLETED"
}