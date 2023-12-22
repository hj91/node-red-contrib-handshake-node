
# Node-RED Handshake Node

This Node-RED contrib node, `node-red-contrib-handshake-node`, implements a robust handshake mechanism. It's designed to manage communication processes between Node-RED and Control Logic Device handling communication failure states efficiently.

Note - Users should implement handshake logic in the Controller for this node to work properly 

## Author

Harshad Joshi

## Features

- Alternating input expectation (`true`/`false`).
- Configurable delay for response timeouts.
- Customizable initial state and maximum failure tolerances.
- Automatic transition to a failure state upon consistent non-receipt of expected inputs.
- Easy integration into existing Node-RED flows for enhanced communication handling.

## Installation

You can install this node directly from your Node-RED environment or by using npm:

### Node-RED Palette

1. Open your Node-RED instance.
2. Go to the Menu -> Manage Palette -> Install.
3. Search for `node-red-contrib-handshake-node` and install.

### NPM Installation

In your Node-RED directory (typically `~/.node-red`), run:

```bash
npm install node-red-contrib-handshake-node
```

After installation, the node will be available in your Node-RED palette.

## Usage

Drag and drop the `handshake-node` into your flow. Double-click on the node to configure its properties:

- **Name**: Assign a unique name for identification.
- **Delay (ms)**: Time in milliseconds before the node enters a failure state if the expected input is not received.

### Input

- Expects `true` or `false` inputs.

### Output

- Toggles and outputs the opposite of the received input.
- Sends a failure message if the expected input is not received within the specified time.

## Contributing

Contributions are welcome. Please open an issue or submit a pull request with your suggested changes.

## Support

For support or to report issues, please visit the [GitHub Issue Tracker](https://github.com/hj91/node-red-contrib-handshake-node/issues).

## License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0). See the [LICENSE](https://github.com/hj91/node-red-contrib-handshake-node/blob/master/LICENSE) file for more details.

