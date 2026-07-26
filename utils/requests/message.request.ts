export class MessageRequest {
  static async POST(body: { name: string; email: string; message: string }) {
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: body.name,
          email: body.email,
          message: body.message,
        }),
      });
      const data = await response.json();
      if (data.status === 400 || data.status === 401 || data.status === 403 || data.status === 404) throw new Error("Something Went Wrong");
      return "Success";
    } catch (error) {
      throw new Error("Something Went Wrong");
    }
  }
}
