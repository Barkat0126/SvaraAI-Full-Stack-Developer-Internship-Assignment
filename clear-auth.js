// Script to clear authentication state
// Run this in browser console: localStorage.clear(); sessionStorage.clear(); document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); }); location.reload();

console.log('To clear authentication state, run this in browser console:');
console.log('localStorage.clear(); sessionStorage.clear(); document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); }); location.reload();');