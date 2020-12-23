export function IsValidHttpUrl(string) {
    //var url=null;
    
    try {
      new URL(string);
    } catch (_) {
      return false;  
    }
  
    return true;
  }