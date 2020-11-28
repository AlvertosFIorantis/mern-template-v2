import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true,
});

// NOTE: an thelo na vlepo to console log apo ta tests ektelo npm run test -- --silent=false adi gia npm test
