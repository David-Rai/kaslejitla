
const TIME_GAP=3 * 1000//30s

//Updates DB using Time based Batching
export const db_updator=()=>{
setInterval(()=>{
console.log("Updating db....")
},TIME_GAP)
}