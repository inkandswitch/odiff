import tape from "tape"
import odiff from "../odiff"


tape("a simple change creates a simple diff", t => {

  expectChanges(t,
    { a: 1 },
    { a: 2 },
    [
      {
        type: "set",
        path: ["a"],
        val: 2
      }]
  )

  expectChanges(t,
    { a: 1 },
    { },
    [
      {
        type: "unset",
        path: ["a"],
      }]
  )

  expectChanges(t,
    [1, 2],
    [1, 2, 3],
    [
      {
        type: "add",
        path: [],
        index: 2,
        vals: [3]
      }]
  )

  expectChanges(t,
    {arr: [1, 2]},
    {arr: [1, 2, 3]},
    [
      {
        type: "add",
        path: ["arr"],
        index: 2,
        vals: [3]
      }]
  )

  expectChanges(t,
    {title: "Hello", body: ""},
    {title: "Hello there", body: ""},
    [
      {
        type: "set",
        path: ["title"],
        val: "Hello there",
      }]
  )

  expectChanges(t,
    {arr: [{task: 1}]},
    {arr: [{task: 1}, {task: 2}]},
    [
      {
        type: "add",
        path: ["arr"],
        index: 1,
        vals: [{task: 2}],
      }]
  )

  expectChanges(t,
    {arr: [{task: 1}]},
    {arr: [{task: 2}, {task: 1}]},
    [
      {
        type: "add",
        path: ["arr"],
        index: 0,
        vals: [{task: 2}],
      }]
  )

  expectChanges(t,
    {arr: [1, 2]},
    {arr: [1, 2, 3, 4]},
    [
      {
        type: "add",
        path: ["arr"],
        index: 2,
        vals: [3, 4],
      }]
  )

  t.end()
})


function expectChanges(t: any, a: any, b: any, changes: any) {
  return t.deepEqual(odiff(a, b), changes)
}
