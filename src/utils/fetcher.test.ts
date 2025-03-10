import { api } from "../config";
import { fetcher } from "./fetcher";

jest.mock("../config", () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

describe("fetcher", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetcher.get should call api.get with correct params", async () => {
    const mockData = { data: { message: "success" } };
    (api.get as jest.Mock).mockResolvedValueOnce(mockData);

    const result = await fetcher.get("/test", { id: 1 });

    expect(api.get).toHaveBeenCalledWith("/test", { params: { id: 1 } });
    expect(result).toEqual(mockData.data);
  });

  test("fetcher.post should call api.post with correct params", async () => {
    const mockData = { data: { message: "created" } };
    (api.post as jest.Mock).mockResolvedValueOnce(mockData);

    const result = await fetcher.post("/test", { arg: { name: "John" } });

    expect(api.post).toHaveBeenCalledWith("/test", { name: "John" });
    expect(result).toEqual(mockData.data);
  });
});
