function status(request, response) {
  response.status(200).json({ chave: "época" });
}

export default status;
