import test from "ava";
import Projector from "../lib/Projector";

test("Can create a new projector", t => {
  const p = new Projector();
});

test("A Projector is instantiated with original bounds", t => {
  const p = new Projector();
  t.deepEqual(p.boundsOriginal(), [[0,0], [100,100]]);
});

test("Can instantiate a Projector with original bounds", t => {
  const cases = [
    {options: {boundsOriginal: [[0,0], [100,100]]}},
    {options: {boundsOriginal: [[-100,-100], [100,100]]}},
    {options: {boundsOriginal: [[0,0], [1000,1000]]}},
  ];
  cases.forEach(item => {
    const p = new Projector(item.options);
    t.deepEqual(p.boundsOriginal(), item.options.boundsOriginal);
  });
});

test("Can reset the original bounds of a Projector", t => {
  const cases = [
    {options: {boundsOriginal: [[0,0], [100,100]]}},
    {options: {boundsOriginal: [[-100,-100], [100,100]]}},
    {options: {boundsOriginal: [[0,0], [1000,1000]]}},
  ];
  cases.forEach(item => {
    const p = new Projector();
    p.boundsOriginal(item.options.boundsOriginal);
    t.deepEqual(p.boundsOriginal(), item.options.boundsOriginal);
  });
});

test("Can get the original bounds of a Projector", t => {
  const cases = [
    {options: {boundsOriginal: [[0,0], [100,100]]}},
    {options: {boundsOriginal: [[-100,-100], [100,100]]}},
    {options: {boundsOriginal: [[0,0], [1000,1000]]}},
  ];
  cases.forEach(item => {
    const p = new Projector();
    p.boundsOriginal(item.options.boundsOriginal);
    t.deepEqual(p.boundsOriginal(), item.options.boundsOriginal);
  });
});

test("A Projector is instantiated with projected bounds", t => {
  const p = new Projector();
  t.deepEqual(p.boundsProjected(), [[0,0], [100,100]]);
});

test("Can instantiate a Projector with projected bounds", t => {
  const cases = [
    {options: {boundsProjected: [[0,0], [100,100]]}},
    {options: {boundsProjected: [[-100,-100], [100,100]]}},
    {options: {boundsProjected: [[0,0], [1000,1000]]}},
  ];
  cases.forEach(item => {
    const p = new Projector(item.options);
    t.deepEqual(p.boundsProjected(), item.options.boundsProjected);
  });
});

test("Can reset the projected bounds of a Projector", t => {
  const cases = [
    {options: {boundsProjected: [[0,0], [100,100]]}},
    {options: {boundsProjected: [[-100,-100], [100,100]]}},
    {options: {boundsProjected: [[0,0], [1000,1000]]}},
  ];
  cases.forEach(item => {
    const p = new Projector();
    p.boundsProjected(item.options.boundsProjected);
    t.deepEqual(p.boundsProjected(), item.options.boundsProjected);
  });
});

test("Can get the projected bounds of a Projector", t => {
  const cases = [
    {options: {boundsProjected: [[0,0], [100,100]]}},
    {options: {boundsProjected: [[-100,-100], [100,100]]}},
    {options: {boundsProjected: [[0,0], [1000,1000]]}},
  ];
  cases.forEach(item => {
    const p = new Projector();
    p.boundsProjected(item.options.boundsProjected);
    t.deepEqual(p.boundsProjected(), item.options.boundsProjected);
  });
});

test("Can project from an original plane to a projected one.", t => {
  const cases = [
    {
      options: {
        boundsOriginal: [[0,0], [100,100]],
        boundsProjected: [[0,0], [100,100]]
      },
      subtests: [
        {input: [ 0, 0],    output: [ 0, 0]},
        {input: [ 0,10],    output: [ 0,10]},
        {input: [10, 0],    output: [10, 0]},
        {input: [10,10],    output: [10,10]},
        {input: [100,100],  output: [100,100]},
        {input: [20,30],    output: [20,30]},
      ]
    },
    {
      options: {
        boundsOriginal: [[-100,-100], [100,100]],
        boundsProjected: [[-100,-100], [100,100]]
      },
      subtests: [
        {input: [0, 0], output: [0, 0]},
        {input: [0,10], output: [0,10]},
        {input: [10, 0], output: [10, 0]},
        {input: [10,10], output: [10,10]},
        {input: [100,100], output: [100,100]},
        {input: [20,30], output: [20,30]},
        {input: [0,-10], output: [ 0,-10]},
        {input: [10,0], output: [10,0]},
        {input: [10,-10], output: [10,-10]},
        {input: [100,-100], output: [100,-100]},
        {input: [20,-30], output: [20,-30]},
        {input: [0,-10], output: [0,-10]},
        {input: [-10,0], output: [-10,0]},
        {input: [-10,-10], output: [-10,-10]},
        {input: [-100,-100], output: [-100,-100]},
        {input: [-20,-30], output: [-20,-30]},
      ]
    },
    {
      options: {
        boundsOriginal: [[0,0], [100,100]],
        boundsProjected: [[0,0], [1000,1000]]
      },
      subtests: [
        {input: [ 0, 0],    output: [ 0, 0]},
        {input: [ 0,10],    output: [ 0,100]},
        {input: [10, 0],    output: [100, 0]},
        {input: [10,10],    output: [100,100]},
        {input: [100,100],  output: [1000,1000]},
        {input: [20,30],    output: [200,300]},
      ]
    },
   {
     options: {
       boundsOriginal: [[0,0], [100,100]],
       boundsProjected: [[0,0], [100,1000]]
     },
     subtests: [
       {input: [ 0, 0],    output: [ 0, 0]},
       {input: [ 0,10],    output: [ 0,100]},
       {input: [10, 0],    output: [10, 0]},
       {input: [10,10],    output: [10,100]},
       {input: [100,100],  output: [100,1000]},
       {input: [20,30],    output: [20,300]},
     ]
   },
   {
     options: {
       boundsOriginal: [[0,0], [100,100]],
       boundsProjected: [[0,0], [1000,100]]
     },
     subtests: [
       {input: [ 0, 0],    output: [ 0, 0]},
       {input: [ 0,10],    output: [ 0,10]},
       {input: [10, 0],    output: [100, 0]},
       {input: [10,10],    output: [100,10]},
       {input: [100,100],  output: [1000,100]},
       {input: [20,30],    output: [200,30]},
     ]
   },
   {
     options: {
       boundsOriginal: [[-100,-100], [100,100]],
       boundsProjected: [[-100,-100], [100,100]]
     },
     subtests: [
       {input: [ 0, 0],    output: [ 0, 0]},
       {input: [ 0,10],    output: [ 0,10]},
       {input: [10, 0],    output: [10, 0]},
       {input: [10,10],    output: [10,10]},
       {input: [100,100],  output: [100,100]},
       {input: [20,30],    output: [20,30]},
       {input: [-10, 0],    output: [-10, -0]},
       {input: [-10, -10],  output: [-10, -10]},
       {input: [-100,-100], output: [-100,-100]},
       {input: [-20, -30],  output: [-20, -30]},
     ]
   },
   {
     options: {
       boundsOriginal: [[0,0], [100,100]],
       boundsProjected: [[-100,-100], [0,0]]
     },
     subtests: [
       {input: [ 0, 0],    output: [-100,-100]},
       {input: [ 0,10],    output: [-100,-90]},
       {input: [10, 0],    output: [-90, -100]},
       {input: [10,10],    output: [-90,-90]},
       {input: [100,100],  output: [0,0]},
       {input: [20,30],    output: [-80,-70]},
     ]
   },
   {
     options: {
       boundsOriginal: [[0,0], [100,100]],
       boundsProjected: [[-100,-100], [100,100]]
     },
     subtests: [
       {input: [ 0, 0],    output: [-100,-100]},
       {input: [ 0,10],    output: [-100,-80]},
       {input: [10, 0],    output: [-80, -100]},
       {input: [10,10],    output: [-80,-80]},
       {input: [100,100],  output: [100,100]},
       {input: [20,30],    output: [-60,-40]},
     ]
   },
   {
     options: {
       boundsOriginal: [[-100,-100], [0,0]],
       boundsProjected: [[0,0], [100,100]]
     },
     subtests: [
       {input: [-100,-100],    output: [ 0, 0]},
       {input: [-100,-90],    output: [ 0,10]},
       {input: [-90, -100],    output: [10, 0]},
       {input: [-90,-90],    output: [10,10]},
       {input: [0,0],  output: [100,100]},
       {input: [-80,-70],    output: [20,30]},
     ]
   },
   {
     options: {
       boundsOriginal: [[-100,-100], [100,100]],
       boundsProjected: [[0,0], [100,100]],
     },
     subtests: [
       {input: [-100,-100],    output: [ 0, 0]},
       {input: [-100,-80],    output: [ 0,10]},
       {input: [-80, -100],    output: [10, 0]},
       {input: [-80,-80],    output: [10,10]},
       {input: [100,100],  output: [100,100]},
       {input: [-60,-40],    output: [20,30]},
     ]
   },
  ];
  cases.forEach((item, index) => {
    const p = new Projector(item.options);
    item.subtests.forEach(subtest => {
      t.deepEqual(p.project(subtest.input), subtest.output, index);
    });
  });
});

test("Can reflect a projection about the X axis", t => {
  const cases = [
    {
      options: {
        boundsOriginal: [[-100,-100], [100,100]],
        boundsProjected: [[0,0], [100,100]],
        reflectX: true
      },
      subtests: [
        {input: [-100,-100],    output: [0,0]},
        {input: [-100,-80],    output: [0,-10]},
        {input: [-80, -100],    output: [10,0]},
        {input: [-80,-80],    output: [10,-10]},
        {input: [100,100],  output: [100,-100]},
        {input: [-60,-40],    output: [20,-30]},
      ]
    },
    {
      options: {
        boundsOriginal: [[0,0], [100,100]],
        boundsProjected: [[0,0], [100,-100]],
        reflectX: true
      },
      subtests: [
        {input: [100,100], output: [100,  0]},
        {input: [100, 80], output: [100, 20]},
        {input: [ 80,100], output: [ 80,  0]},
        {input: [ 80, 80], output: [ 80, 20]},
        {input: [100,100], output: [100,  0]},
        {input: [ 60, 40], output: [ 60, 60]},
      ]
    },
  ];
  cases.forEach((item, index) => {
    const p = new Projector(item.options);
    item.subtests.forEach(subtest => {
      t.deepEqual(p.project(subtest.input), subtest.output, index);
    });
  });
});
