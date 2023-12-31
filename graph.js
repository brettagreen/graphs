class Node {
	constructor(val, adjacent = new Set()) {
		this.val = val;
		this.adjacent = adjacent;
	}
}

class Graph {
	constructor() {
		this.nodes = new Set();
	}

	// this function accepts a Node instance and adds it to the nodes property on the graph
	addNode(node) {
		this.nodes.add(node);
	}

	// this function accepts an array of Node instances and adds them to the nodes property on the graph
	addNodes(nodeArray) {
		for (let node of nodeArray) {
			this.nodes.add(node);
		}
	}

	// this function accepts two nodes and updates their adjacent values to include the other node
	addEdge(node1, node2) {
		node1.adjacent.add(node2);
		node2.adjacent.add(node1);
	}

	// this function accepts two nodes and updates their adjacent values to remove the other node
	removeEdge(node1, node2) {
		node1.adjacent.delete(node2);
		node2.adjacent.delete(node1);
	}

	// this function accepts a node and removes it from the nodes property, it also updates any adjacency lists that include that node
	removeNode(node) {
		for (let n of node.adjacent) {
			n.adjacent.delete(node);
		}
		this.nodes.delete(node);
	}

	// this function returns an array of Node values using DFS
	depthFirstSearch(start) {
		const stack = [start];
		const visited = new Set(stack);
		const nodeArray = [];

		while (stack.length > 0) {
			let node = stack.pop();
			nodeArray.push(node.val);
			
			for (let adj of node.adjacent) {
				if (!visited.has(adj)) {
					stack.push(adj);
					visited.add(adj);
				}
			}
		}
		return nodeArray;
	}

	// this function returns an array of Node values using BFS
	breadthFirstSearch(start) {
		const queue = [start];
		const visited = new Set(queue);
		const nodeArray = [];

		while (queue.length > 0) {
			let node = queue.shift();
			nodeArray.push(node.val);
			
			for (let adj of node.adjacent) {
				if (!visited.has(adj)) {
					queue.push(adj);
					visited.add(adj);
				}
			}
		}
		return nodeArray;
	}

	//returns length of shortest path from source node to target node
	shortestPath(source, target) {
		if (source.adjacent.has(target)) return 1;
		let paths = Array.from(source.adjacent);
		const visited = new Set(paths);
		
		function walkTheGraph(paths, count) {
			let subPaths = [];
			for (let path of paths) {
				if (path.adjacent.has(target)) {
					return count + 1;
				} else {
					for (let subPath of path.adjacent) {
						if (!visited.has(subPath)) {
							subPaths.push(subPath);
							visited.add(subPath);
						}
					}
				}
			} 
			if (subPaths.length === 0) return 'no path to target';
			return walkTheGraph(subPaths, count + 1);
		}

		return walkTheGraph(paths, 1);
	}

	//can any node in this graph walk its way back to itself? 
	//this method will tell you! (true/false)
	isCyclic() {

		function canIHazCyclical(subNodes, visited, last=null) {
			let subArray = [];
			visited.add(last);
			
			for (let subNode of subNodes) {
				if (Array.from(subNode.adjacent).some(val => visited.has(val) && val !== last)) {
					return true;
				} else {
					Array.from(subNode.adjacent).forEach(val => {
						if (!visited.has(val)) {
							subArray.push(val);
						}
					})
				}
				if (subArray.length !== 0) {
					return canIHazCyclical(subArray, visited, subNode);
				}
			}
			return false;
		}

		let result;
		for (let node of this.nodes) {
			result = canIHazCyclical(Array.from(node.adjacent), new Set(), node);
			if (result) return result;
		}

		return false;
	}
}

module.exports = {Graph, Node}