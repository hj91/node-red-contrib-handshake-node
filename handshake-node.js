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
        var lastState = null;
        var delay = Number(config.delay) || 2000; // Default to 2000 ms if not specified

        function updateStatus(message, color, shape) {
            node.status({fill: color, shape: shape, text: message});
        }

        function resetTimer() {
            clearTimeout(timer);
            timer = setTimeout(() => {
                updateStatus("Communication Failed", "red", "ring");
                node.send({ payload: "Communication Failed" });
            }, delay);
        }

        node.on('input', function(msg) {
            if (msg.payload === true || msg.payload === false) {
                if (msg.payload !== lastState) {
                    lastState = msg.payload;
                    updateStatus("State changed", "green", "dot");
                } else {
                    updateStatus("State unchanged", "yellow", "dot");
                }
                resetTimer(); // Reset the timer on every input
                node.send({ payload: msg.payload });
            } else {
                updateStatus("Invalid input", "red", "ring");
                node.send({ payload: "Invalid input" });
            }
        });

        node.on('close', function() {
            clearTimeout(timer);
        });

        // Initialize
        resetTimer();
    }

    RED.nodes.registerType("handshake-node", HandshakeNode);
};

//handshake-node.js
