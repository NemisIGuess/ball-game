export default function CommandsService(state, dispatch, wsClient) {
  if (!wsClient || !state || !dispatch) return {};

  let handlers = [];

  const COMMANDS = {
    REGISTER: "REGISTER",
  };
  wsClient.onopen = function () {
    console.log("WebSocket Client Connected");
  };

  wsClient.onclose = function () {
    console.log("echo-protocol Client Closed");
  };

  wsClient.onmessage = function (e) {
    const { topic, payload } = JSON.parse(e.data);
    callHandlers(topic, payload);
  };

  function callHandlers(topic, payload) {
    handlers
      .filter((h) => h.topic === topic)
      .forEach((handler) => {
        handler.handle(payload);
      });
  }

  function register(callback, userId) {
    if (callback) {
      handlers.push({
        topic: COMMANDS.REGISTER,
        handle: callback,
      });
    }
    wsClient.send(
      JSON.stringify({
        command: COMMANDS.REGISTER,
      })
    );
  }

  return {
    register,
  };
}
