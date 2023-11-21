import { expect } from "chai";
import { use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { paginate } from "../pagination";

use(chaiAsPromised);

describe("pagination", () => {
  it("should have paginated util returning paginated result", async () => {
    const result = [{}, {}, {}];

    expect(paginate(result, { limit: 3, offset: 0, totalCount: 11 })).to.eql({
      data: [{}, {}, {}],
      page: {
        limit: 3,
        offset: 0,
        count: 3,
        totalCount: 11,
        hasPreviousPage: false,
        hasNextPage: true,
      },
    });
  });

  it("should return correctly calculated hasNext and hasPrevious flags", async () => {
    const result = Array(3).fill({});

    expect(paginate(result, { limit: 3, offset: 4, totalCount: 11 })).to.eql({
      data: result,
      page: {
        limit: 3,
        offset: 4,
        count: 3,
        totalCount: 11,
        hasPreviousPage: true,
        hasNextPage: true,
      },
    });
  });
});
