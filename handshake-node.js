/**

 handshake-node.js - Copyright 2023 Harshad Joshi and Bufferstack.IO Analytics Technology LLP, Pune

 Licensed under the GNU General Public License, Version 3.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://www.gnu.org/licenses/gpl-3.0.html

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 **/


module.exports = function(RED) {
    function HandshakeNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var timer;
        var delay = Number(config.delay) || 2000; // Default to 2000 ms if not specified
        var initialState = config.initialState === "true"; // Configurable initial state
        var expectedState = initialState;
        var consecutiveFailures = 0;
        var maxFailures = Number(config.maxFailures) || 3; // Maximum allowed consecutive failures

        function updateStatus(message, color, shape) {
            node.status({fill: color, shape: shape, text: message});
        }

        function initiateTimer() {
            clearTimeout(timer); // Clear any existing timer
            timer = setTimeout(() => {
                consecutiveFailures++;
                if (consecutiveFailures >= maxFailures) {
                    updateStatus("Communication Failed", "red", "ring");
                    node.send({ payload: "Communication Failed" });
                    consecutiveFailures = 0; // Reset failure count
                } else {
                    updateStatus("Awaiting expected input", "yellow", "ring");
                }
                expectedState = !expectedState; // Toggle expected state
                initiateTimer(); // Restart timer for continuous monitoring
            }, delay);
        }

        node.on('input', function(msg) {
            if (msg.payload === expectedState) {
                clearTimeout(timer); // Stop the failure timer
                updateStatus("Communicating", "green", "dot");
                node.send({ payload: !msg.payload }); // Send the opposite of received input
                expectedState = !expectedState; // Toggle expected state
                consecutiveFailures = 0; // Reset failure count
                initiateTimer(); // Restart timer after processing input
            } else {
                updateStatus("Unexpected input", "red", "ring");
                node.send({ payload: "Unexpected input" });
                // Do not reset timer to allow for error recovery
            }
        });

        node.on('close', function() {
            clearTimeout(timer); // Clear timer on node close
        });

        // Start the timer when the node is deployed
        initiateTimer();
    }

    RED.nodes.registerType("handshake-node", HandshakeNode);
};

//handshake-node.js
