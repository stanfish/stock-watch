import moxios from 'moxios'
import {setUser, setStocks, setDateRange, fetchCurrentPrice, fetchCompany, fetchDatePrice} from 'actions';
import {mockStore} from 'testUtil/mockStore';
import {getAction} from 'testUtil/getAction';

describe('setUser', () => {
  it ('has the correct type', () => {
    const action = setUser();
    expect(action.type).toEqual('SET_USER');
  });

  it ('has the correct payload', () => {
    const action = setUser('new user');
    expect(action.payload.user).toEqual('new user');
  });
});

describe('setStocks', () => {
  it ('has the correct type', () => {
    const action = setStocks();
    expect(action.type).toEqual('SET_STOCKS');
  });

  it ('has the correct payload', () => {
    const action = setStocks('FB');
    expect(action.payload.stocks).toEqual('FB');
  });
});

describe('setDateRange', () => {
  it ('has the correct type', () => {
    const action = setDateRange();
    expect(action.type).toEqual('SET_DATE_RANGE');
  });

  it ('has the correct payload', () => {
    const fromDate = '01-01-2019';
    const toDate = '02-01-2019';
    const action = setDateRange(fromDate, toDate);
    expect(action.payload.fromDate).toEqual(fromDate);
    expect(action.payload.toDate).toEqual(toDate);
  });
});

describe('fetchCurrentPrice', () => {
  it("has the correct type", async () => {
    const store = mockStore();
    const action = { type: 'FETCH_CURRENT_PRICE', payload: {} }
    store.dispatch(action);
    const resultAction = await getAction(store, "FETCH_CURRENT_PRICE");
    expect(resultAction.type).toEqual("FETCH_CURRENT_PRICE");
  });

  it("has the correct payload", async () => {
    const store = mockStore();
    const price = 123;
    const stock = 'FB';
    const action = { type: 'FETCH_CURRENT_PRICE', payload: { stock, price} }
    store.dispatch(action);
    const resultAction = await getAction(store, "FETCH_CURRENT_PRICE");
    expect(resultAction.payload.price).toEqual(price);
    expect(resultAction.payload.stock).toEqual(stock);
  });

  describe('Stock price API', () => {
    let store;
    beforeEach(function () {
      // import and pass your custom axios instance to this method
      moxios.install();
      store = mockStore();
    })

    afterEach(function () {
      // import and pass your custom axios instance to this method
      moxios.uninstall()
    })

    it("fetch successfully", () => {
      const mockPrice = 123;
      const stock = "FB";
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockPrice,
        });
      });
      return store.dispatch(fetchCurrentPrice(stock)).then(() => {
        expect(store.getActions()).toEqual([{ type: 'FETCH_CURRENT_PRICE', payload: { stock, price: mockPrice } }]);
      });
    });

    it("fetch with error", () => {
      const stock = "FB";
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: {error: 'error message'},
        });
      });
      
      return store.dispatch(fetchCurrentPrice(stock)).then(() => {
        expect(store.getActions()).toEqual([{ type: 'FETCH_CURRENT_PRICE', payload: { stock, price: 'N/A' } }]);
      });
    });
  });
});

describe('fetchCompany', () => {
  it("has the correct type", async () => {
    const store = mockStore();
    const action = { type: 'FETCH_COMPANY', payload: {} }
    store.dispatch(action);
    const resultAction = await getAction(store, "FETCH_COMPANY");
    expect(resultAction.type).toEqual("FETCH_COMPANY");
  });

  it("has the correct payload", async () => {
    const store = mockStore();
    const company = 'Facebook';
    const stock = 'FB';
    const action = { type: 'FETCH_COMPANY', payload: { stock, company} }
    store.dispatch(action);
    const resultAction = await getAction(store, "FETCH_COMPANY");
    expect(resultAction.payload.company).toEqual(company);
  });

  describe('Stock company API', () => {
    let store;
    beforeEach(function () {
      // import and pass your custom axios instance to this method
      moxios.install();
      store = mockStore();
    })

    afterEach(function () {
      // import and pass your custom axios instance to this method
      moxios.uninstall()
    })

    it("fetch successfully", () => {
      const mockCompany = "Facebook";
      const stock = "FB";
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {companyName: mockCompany},
        });
      });
      return store.dispatch(fetchCompany(stock)).then(() => {
        expect(store.getActions()).toEqual([{ type: 'FETCH_COMPANY', payload: { stock, company: mockCompany } }]);
      });
    });

    it("fetch with error", () => {
      const stock = "FB";
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: {error: 'error message'},
        });
      });
      return store.dispatch(fetchCompany(stock)).then(() => {
        expect(store.getActions()).toEqual([{ type: 'FETCH_COMPANY', payload: { stock, company: '' } }]);
      });
    });
  });
});

describe('fetchDatePrice', () => {
  it("has the correct type", async () => {
    const store = mockStore();
    const action = { type: 'FETCH_DATE_PRICE', payload: {} }
    store.dispatch(action);
    const resultAction = await getAction(store, "FETCH_DATE_PRICE");
    expect(resultAction.type).toEqual("FETCH_DATE_PRICE");
  });

  it("has the correct payload", async () => {
    const store = mockStore();
    const stock = 'FB';
    const action = { type: 'FETCH_DATE_PRICE', payload: { stock, isFrom: true, price: 123} }
    store.dispatch(action);
    const resultAction = await getAction(store, "FETCH_DATE_PRICE");
    expect(resultAction.payload.stock).toEqual(stock);
    expect(resultAction.payload.price).toEqual(123);
  });

  describe('Stock price chart API', () => {
    let store;
    beforeEach(function () {
      // import and pass your custom axios instance to this method
      moxios.install();
      store = mockStore();
    })

    afterEach(function () {
      // import and pass your custom axios instance to this method
      moxios.uninstall()
    })

    it("fetch successfully with previous date", () => {
      const stock = "FB";
      const mockPrice = 334;
      let mockDate = new Date();
      mockDate.setDate(mockDate.getDate() - 1);
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: [{average: mockPrice}],
        });
      });
      return store.dispatch(fetchDatePrice(stock, mockDate, true)).then(() => {
        expect(store.getActions()).toEqual([{ type: 'FETCH_DATE_PRICE', payload: { stock, price: mockPrice, isFrom: true } }]);
      });
    });

    it("fetch with error", () => {
      const stock = "FB";
      const mockPrice = 334;
      let mockDate = new Date();
      mockDate.setDate(mockDate.getDate() - 1);      
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: {error: 'error message'},
        });
      });
      return store.dispatch(fetchDatePrice(stock, mockDate, true)).then(() => {
        expect(store.getActions()).toEqual([{ type: 'FETCH_DATE_PRICE', payload: { stock, isFrom: true, price: 'N/A' } }]);
      });
    });

    it("handle fetch with today", () => {
      const stock = "FB";
      let mockDate = new Date();
      return store.dispatch(fetchDatePrice(stock, mockDate, true)).then(() => {
        expect(store.getActions()).toEqual([{ type: 'FETCH_DATE_PRICE', payload: { stock, isFrom: true } }]);
      });
    });
  });
});

