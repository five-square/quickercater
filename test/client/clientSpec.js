import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import App from '../../client/components/App';
import Cart from '../../client/components/Cart';
import CartItemCard from '../../client/components/CartItemCard';
import CateringOptions from '../../client/components/CateringOptions';
import CompanyDescription from '../../client/components/CompanyDescription';
import CustomerForm from '../../client/components/CustomerForm';
import Dashboard from '../../client/components/Dashboard';
import ItemCard from '../../client/components/ItemCard';
import Lobby from '../../client/components/Lobby';
import Login from '../../client/components/Login';
import MenuCard from '../../client/components/MenuCard';
import Navigation from '../../client/components/Navigation';
import OrderTable from '../../client/components/OrderTable';
import StoreCard from '../../client/components/StoreCard';
import StoreFront from '../../client/components/StoreFront';
import orderAPI from '../../client/models/orderAPI';

global.describe('Component: App', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<App />).length).to.be.above(0);
  });
});

global.describe('Component: Cart', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<Cart />).length).to.be.above(0);
  });
});

global.describe('Component: CartItemCard', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<CartItemCard />).length).to.be.above(0);
  });
});

global.describe('Component: CateringOptions', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<CateringOptions />).length).to.be.above(0);
  });
});

global.describe('Component: CompanyDescription', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<CompanyDescription />).length).to.be.above(0);
  });
});

global.describe('Component: CustomerForm', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<CustomerForm />).length).to.be.above(0);
  });

  global.it('renders without exploding', () => {
	global.expect(shallow(<App />)).to.be.above(0);
  });
});

global.describe('Component: Cart', () => {
	global.it('renders without exploding', () => {
		global.expect(shallow(<Cart />)).to.be.above(0);
	});
});

global.describe('Component: CartItemCard', () => {
	global.it('renders without exploding', () => {
		global.expect(shallow(<CartItemCard />)).to.be.above(0);
	});
});

global.describe('Component: CateringOptions', () => {
	global.it('renders without exploding', () => {
		global.expect(shallow(<CateringOptions />)).to.be.above(0);
	});
});

global.describe('Component: CompanyDescription', () => {
	global.it('renders without exploding', () => {
		global.expect(shallow(<CompanyDescription />)).to.be.above(0);
	});
});

global.describe('Component: CustomerForm', () => {
	global.it('renders without exploding', () => {
		global.expect(shallow(<CustomerForm />)).to.be.above(0);
	});
});

global.describe('Component: Cart', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<Cart />).length).to.be.above(0);
  });
});

global.describe('Component: CartItemCard', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<CartItemCard />).length).to.be.above(0);
  });
});

global.describe('Component: CateringOptions', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<CateringOptions />).length).to.be.above(0);
  });
});

global.describe('Component: CompanyDescription', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<CompanyDescription />).length).to.be.above(0);
  });
});

global.describe('Component: CustomerForm', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<CustomerForm />).length).to.be.above(0);
  });
});

global.describe('Component: Dashboard', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<Dashboard />).length).to.be.above(0);
  });
  global.it('has access to OrderAPI helper functions', () => {
    orderAPI.getPendingOrders(646).then(resp => {
      global.expect(resp).to.not.be(undefined);
      global.expect(resp).to.not.deep.equal({});
    });
  });
});

global.describe('Component: ItemCard', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<ItemCard />).length).to.be.above(0);
  });
});

global.describe('Component: Lobby', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<Lobby />).length).to.be.above(0);
  });
});

global.describe('Component: MenuCard', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<MenuCard />).length).to.be.above(0);
  });
});

global.describe('Component: Navigation', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<Navigation />).length).to.be.above(0);
  });
});

global.describe('Component: OrderTable', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<OrderTable />).length).to.be.above(0);
  });
});

global.describe('Component: StoreCard', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<StoreCard />).length).to.be.above(0);
  });
});

global.describe('Component: StoreFront', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<StoreFront />).length).to.be.above(0);
  });
});

global.describe('Component: Lobby', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<Lobby />).length).to.be.above(0);
  });
});

global.describe('Component: Login', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<Login />).length).to.be.above(0);
  });
});

global.describe('Component: MenuCard', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<MenuCard />).length).to.be.above(0);
  });
});

global.describe('Component: Navigation', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<Navigation />).length).to.be.above(0);
  });
});

global.describe('Component: OrderTable', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<OrderTable />).length).to.be.above(0);
  });
});

global.describe('Component: StoreCard', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<StoreCard />).length).to.be.above(0);
  });
});

global.describe('Component: StoreFront', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<StoreFront />).length).to.be.above(0);
  });
});

});

global.describe('Component: Header', () => {
	global.it('renders without exploding', () => {
		expect(shallow(<Header />)).to.be.above(0);
	});
});

global.describe('Component: ItemCard', () => {
	global.it('renders without exploding', () => {
		expect(shallow(<ItemCard />)).to.be.above(0);
	});
});

global.describe('Component: Lobby', () => {
	global.it('renders without exploding', () => {
		expect(shallow(<Lobby />)).to.be.above(0);
	});
});

global.describe('Component: MenuCard', () => {
	global.it('renders without exploding', () => {
		expect(shallow(<MenuCard />)).to.be.above(0);
	});
});

global.describe('Component: Navigation', () => {
	global.it('renders without exploding', () => {
		expect(shallow(<Navigation />)).to.be.above(0);
	});
});

global.describe('Component: OrderTable', () => {
	global.it('renders without exploding', () => {
		expect(shallow(<OrderTable />)).to.be.above(0);
	});
});

global.describe('Component: StoreCard', () => {
	global.it('renders without exploding', () => {
		expect(shallow(<StoreCard />)).to.be.above(0);
	});
});

global.describe('Component: StoreFront', () => {
	global.it('renders without exploding', () => {
		expect(shallow(<StoreFront />)).to.be.above(0);
	});
});

global.describe('Component: ItemCard', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<ItemCard />).length).to.be.above(0);
  });
});

global.describe('Component: Lobby', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<Lobby />).length).to.be.above(0);
  });
});

global.describe('Component: Login', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<Login />).length).to.be.above(0);
  });
});

global.describe('Component: MenuCard', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<MenuCard />).length).to.be.above(0);
  });
});

global.describe('Component: Navigation', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<Navigation />).length).to.be.above(0);
  });
});

global.describe('Component: OrderTable', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<OrderTable />).length).to.be.above(0);
  });
});

global.describe('Component: StoreCard', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<StoreCard />).length).to.be.above(0);
  });
});

global.describe('Component: StoreFront', () => {
  global.it('renders without exploding', () => {
    expect(shallow(<StoreFront />).length).to.be.above(0);
  });
});
