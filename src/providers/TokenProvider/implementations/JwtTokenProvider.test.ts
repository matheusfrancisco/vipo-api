import JwtTokenProvider from "@providers/TokenProvider/implementations/JwtTokenProvider";

describe("JwtTokenProvider", () => {
  test("should create a token correctly", async () => {
    const tokenProvider = new JwtTokenProvider();

    const payload = { key: "value" };

    const token = await tokenProvider.generateToken(payload);

    expect(token).toBeDefined();
  });

  test("it should throw when trying to create a token with an invalid payload", async () => {
    const tokenProvider = new JwtTokenProvider();

    const payload = null;

    await expect(tokenProvider.generateToken(payload as any)).rejects.toThrow();
  });

  test("it should return the correct payload when decoding a token", async () => {
    const tokenProvider = new JwtTokenProvider();

    const payload = { key: "value" };

    const token = await tokenProvider.generateToken(payload);

    const decoded = await tokenProvider.decodeToken(token);

    expect(decoded).toMatchObject(payload);
  });

  test("it should throw when trying to decode an invalid token", async () => {
    const tokenProvider = new JwtTokenProvider();

    await expect(
      tokenProvider.decodeToken("random-invalid-token")
    ).rejects.toThrow();
  });
});
