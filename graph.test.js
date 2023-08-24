const { Graph, Node } = require("./graph");

describe("addNode", function() {
  it("should add a key in the adjacency", function() {
    let graph = new Graph();
    let a = new Node("A");
    let b = new Node("B");
    let c = new Node("C");
    expect(graph.nodes.has(a)).toBe(false);
    expect(graph.nodes.has(b)).toBe(false);
    expect(graph.nodes.has(c)).toBe(false);
    graph.addNode(a);
    graph.addNode(b);
    graph.addNode(c);
    expect(graph.nodes.has(a)).toBe(true);
    expect(graph.nodes.has(b)).toBe(true);
    expect(graph.nodes.has(c)).toBe(true);
  });
});

describe("addNodes", function() {
  it("should add multiple keys in the adjacency", function() {
    let graph = new Graph();
    let a = new Node("A");
    let b = new Node("B");
    let c = new Node("C");
    expect(graph.nodes.has(a)).toBe(false);
    expect(graph.nodes.has(b)).toBe(false);
    expect(graph.nodes.has(c)).toBe(false);
    graph.addNodes([a, b, c]);
    expect(graph.nodes.has(a)).toBe(true);
    expect(graph.nodes.has(b)).toBe(true);
    expect(graph.nodes.has(c)).toBe(true);
  });
});

describe("addEdge", function() {
  it("should add the appropriate edges to the adjacency list", function() {
    let graph = new Graph();
    let a = new Node("A");
    let b = new Node("B");
    let c = new Node("C");
    let d = new Node("D");
    graph.addNodes([a, b, c, d]);
    graph.addEdge(a, b);
    graph.addEdge(a, c);
    graph.addEdge(b, d);
    graph.addEdge(c, d);
    expect(a.adjacent).toContain(b, c);
    expect(b.adjacent).toContain(a, d);
    expect(c.adjacent).toContain(a, d);
    expect(d.adjacent).toContain(b, c);
  });
});

describe("removeEdge", function() {
  it("should remove the nodes from the adjacency list", function() {
    let graph = new Graph();
    let a = new Node("A");
    let b = new Node("B");
    let c = new Node("C");
    let d = new Node("D");
    graph.addNodes([a, b, c, d]);
    graph.addEdge(a, b);
    graph.addEdge(a, c);
    graph.addEdge(b, d);
    graph.addEdge(c, d);

    graph.removeEdge(b, a);
    graph.removeEdge(c, d);

    expect(a.adjacent).not.toContain(b);
    expect(c.adjacent).not.toContain(d);
  });
});

describe("removeNode", function() {
  it("should remove the node as well as any edges", function() {
    let graph = new Graph();
    let a = new Node("A");
    let b = new Node("B");
    let c = new Node("C");
    let d = new Node("D");
    graph.addNodes([a, b, c, d]);
    graph.addEdge(a, b);
    graph.addEdge(a, c);
    graph.addEdge(b, d);
    graph.addEdge(c, d);

    graph.removeNode(c);
    graph.removeNode(d);

    expect(a.adjacent.has(c)).toBeFalsy()
    expect(b.adjacent.has(d)).toBeFalsy()

    expect(graph.nodes.has(a)).toBeTruthy();
    expect(graph.nodes.has(b)).toBeTruthy();
    expect(graph.nodes.has(c)).toBeFalsy();
    expect(graph.nodes.has(d)).toBeFalsy();
  });
});

describe("DFS", function() {
  it("return an array of the nodes searched using DFS", function() {

    const graph = new Graph();
    let S = new Node("S");
    let P = new Node("P");
    let U = new Node("U");
    let X = new Node("X");
    let Q = new Node("Q");
    let Y = new Node("Y");
    let V = new Node("V");
    let R = new Node("R");
    let W = new Node("W");
    let T = new Node("T");
    let Z = new Node("Z");
    
    graph.addNodes([S, P, U, X, Q, Y, V, R, W, T, Z]);
    
    graph.addEdge(S, P);
    graph.addEdge(S, U);
    
    graph.addEdge(P, X);
    graph.addEdge(U, X);
    
    graph.addEdge(P, Q);
    graph.addEdge(U, V);
    
    graph.addEdge(X, Q);
    graph.addEdge(X, Y);
    graph.addEdge(X, V);
    
    graph.addEdge(Q, R);
    graph.addEdge(Y, R);
    
    graph.addEdge(Y, W);
    graph.addEdge(V, W);
    
    graph.addEdge(R, T);
    graph.addEdge(W, Z);
    graph.addEdge(Z, T);

    expect(graph.depthFirstSearch(S)).toEqual([
        'S', 'U', 'V', 'W',
        'Z', 'T', 'R', 'Q',
        'Y', 'X', 'P'
      ]);
  });
});

describe("BFS", function() {
  it("should return an array of the nodes searched using BFS", function() {

    const graph = new Graph();
    let S = new Node("S");
    let P = new Node("P");
    let U = new Node("U");
    let X = new Node("X");
    let Q = new Node("Q");
    let Y = new Node("Y");
    let V = new Node("V");
    let R = new Node("R");
    let W = new Node("W");
    let T = new Node("T");
    let Z = new Node("Z");
    
    graph.addNodes([S, P, U, X, Q, Y, V, R, W, T, Z]);
    
    graph.addEdge(S, P);
    graph.addEdge(S, U);
    
    graph.addEdge(P, X);
    graph.addEdge(U, X);
    
    graph.addEdge(P, Q);
    graph.addEdge(U, V);
    
    graph.addEdge(X, Q);
    graph.addEdge(X, Y);
    graph.addEdge(X, V);
    
    graph.addEdge(Q, R);
    graph.addEdge(Y, R);
    
    graph.addEdge(Y, W);
    graph.addEdge(V, W);
    
    graph.addEdge(R, T);
    graph.addEdge(W, Z);
    graph.addEdge(Z, T);

    expect(graph.breadthFirstSearch(S)).toEqual([
        'S', 'P', 'U', 'X',
        'Q', 'V', 'Y', 'R',
        'W', 'T', 'Z'
      ]);
  });
});

describe("shortestPath", function() {
  it("returns shortest path from START node to TARGET node", function() {

    const graph = new Graph();
    let S = new Node("S");
    let P = new Node("P");
    let U = new Node("U");
    let X = new Node("X");
    let Q = new Node("Q");
    let Y = new Node("Y");
    let V = new Node("V");
    let R = new Node("R");
    let W = new Node("W");
    let T = new Node("T");
    let Z = new Node("Z");
    
    graph.addNodes([S, P, U, X, Q, Y, V, R, W, T, Z]);
    
    graph.addEdge(S, P);
    graph.addEdge(S, U);
    
    graph.addEdge(P, X);
    graph.addEdge(U, X);
    
    graph.addEdge(P, Q);
    graph.addEdge(U, V);
    
    graph.addEdge(X, Q);
    graph.addEdge(X, Y);
    graph.addEdge(X, V);
    
    graph.addEdge(Q, R);
    graph.addEdge(Y, R);
    
    graph.addEdge(Y, W);
    graph.addEdge(V, W);
    
    graph.addEdge(R, T);
    graph.addEdge(W, Z);
    graph.addEdge(Z, T);

    expect(graph.shortestPath(S, T)).toEqual(4);
    expect(graph.shortestPath(S, X)).toEqual(2);
    graph.removeEdge(W, Z);
    graph.removeEdge(Z, T);
    expect(graph.shortestPath(S, Z)).toEqual('no path to target');
  });
});

describe("isCyclic", function() {
    it("returns true if graph is cyclic, false if not", function() {
  
      let graph = new Graph();
      let S = new Node("S");
      let P = new Node("P");
      let U = new Node("U");
      let X = new Node("X");
      let Q = new Node("Q");
      let Y = new Node("Y");
      let V = new Node("V");
      let R = new Node("R");
      let W = new Node("W");
      let T = new Node("T");
      let Z = new Node("Z");
      
      graph.addNodes([S, P, U, X, Q, Y, V, R, W, T, Z]);
      
      graph.addEdge(S, P);
      graph.addEdge(S, U);
      
      graph.addEdge(P, X);
      graph.addEdge(U, X);
      
      graph.addEdge(P, Q);
      graph.addEdge(U, V);
      
      graph.addEdge(X, Q);
      graph.addEdge(X, Y);
      graph.addEdge(X, V);
      
      graph.addEdge(Q, R);
      graph.addEdge(Y, R);
      
      graph.addEdge(Y, W);
      graph.addEdge(V, W);
      
      graph.addEdge(R, T);
      graph.addEdge(W, Z);
      graph.addEdge(Z, T);
  
      expect(graph.isCyclic()).toEqual(true);

      graph = new Graph();
      S = new Node("S");
      P = new Node("P");
      U = new Node("U");
      X = new Node("X");
      Q = new Node("Q");
      Y = new Node("Y");
      V = new Node("V");
      R = new Node("R");
      W = new Node("W");
      T = new Node("T");
      Z = new Node("Z");

      graph.addNodes([S, P, U, X, Q, Y, V, R, W, T, Z]);

      graph.addEdge(S, Z);
      graph.addEdge(P, X);
      graph.addEdge(P, Q);
      graph.addEdge(U, V);
      graph.addEdge(X, Y);
      graph.addEdge(Y, R);
      graph.addEdge(V, W);
      graph.addEdge(R, T);
      graph.addEdge(W, Z);

      expect(graph.isCyclic()).toEqual(false);
    });
  });
  
