import React, { useEffect } from "react";

import Logout from "./pages/logout/Logout";
import HomePage from "./pages/dummy_pages/HomePage";
import SignupLoginForm from "./pages/SignupLoginForm/SignupLoginForm";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
// to wihtRouter to thelo gia na exo access sto props.history kai na boro na to peraso san aargumetn sto action !!!
import { withRouter } from "react-router-dom";

//kan import ena test page gia na dokimaso to protected route sto frontend afto den exi na kani me to backedn apla thelo na do an boro sto fornted na pao se afto to route mono an exo token ola ta data ta pernoa etsi kai alios apo to bakcend afto eini gia na einai pio oreo to expriense tou user osta na tou leo na kanei login an dne exei token gia na paei se sigkriemeno route
import user_test_page from "./pages/dummy_pages/user_test_page";
//kano improt to helper function pou exo ftiaksi gia to functionaltiy pou thelo

import auth_check from "./util/auth_check";
import Navbar from "./pages/navbar/Navbar";

// Kano import to action gia na boro na kano refresh to token apo to local storage
import { loginToken } from "./_actions/actions/Users/loginToken";

function App(props) {
  // Function to check from logal storage if the user is autheticated
  const checkAuthenticated = () => {
    console.log("running login action");
    props.loginToken(props.history);
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  return (
    <div className="App">
      {props.token ? <Navbar /> : null}

      {/* boro giro apo to switch stamtent na valo ena div/main tag kai na valo to css pou exo sto Navbar.css gia na kano push olo to contnate apo ta componets pou kano render pros ta deksia giati exo kai to navbar pou piani xoro */}

      <div className="container">
        <Switch>
          <Route exact path="/" component={SignupLoginForm} />
          {/* <Route exact path="/login" component={Login} /> */}
          <Route exact path="/home" component={auth_check(HomePage)} />
          {/* <Route exact path="/" component={Signup} /> */}

          <Route exact path="/test" component={auth_check(user_test_page)} />
          <Route exact path="/logout" component={auth_check(Logout)} />
          {/* <Route exact path="/test" component={user_test_page} /> */}
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  };
};

const mapDispatchToProps = {
  loginToken: loginToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

// xriazete na valo to withRouter gian axpo prosvasi sto props.history oste na to peraso sto action loginToken gia na kano verify to token apo to local storage
// kai na boron na to kano push,histoty gia na alkos URL kai component otan akno load to app gia proti fora kai exo token sto local storage

// // POLI SIMADIKO AN EXO GIT KAI EXO KANI COMMIT TA TESTS PRIN TO COMMIT DNE THA FENDOE STO CONSOLOE OTAN TREXO TA TEsTS GIATI TO JEST PISTEVI OTI AN TA EKAN COMMIT SIMEI OTI EXOUN EPRASI KAI DEN ME NEDIAFEROUN TORA an thelo na ta treekso ola pata a argumetn sto consoleo peristoera sto video https://www.youtube.com/watch?v=tYMLXpOJtng&list=PL-Db3tEF6pB8Am-IhCRgyGSxTalkDpUV_&index=2 sto 58:00 lepto

// // an exo ftiaksi to app mou me to npx create-reacta-app . tote to mono pou exo na kano gia na kano setup to enzyme na doulepsi me to react einai na pao sto ./src folder kai na ftiakso ena file pou to lene setupTests.js

// adi na psaxno gia classes pou eina iapolita sosto boro na peraso sto compoents mou kanonika emsa sto react ena property pou legete data-test kai me afto to tropo afto tha psaxno mesa sto test opote kai na alakso to onoma tou class dne tha xalazei to functionality tou test apla adi na psaxno gia class mesa sto stest tha psaxno me findByTestAtrr gia apradigka gia to data-test pou exo sto header componet sot test tha psakso gia const wrapper = findByTestAtrr(component, 'headerComponent');

// xxxxxxxxxxxxxxxxx integration test xxxxxxxxxxxxxxxxxx

// edo grafo ta to integration test gia na veveotho oti to action o reducer kai to redux store ola enonode sosta kai doulevoun. Gia na kano to integration test prepei na ftiakso ena test store idio me afto pou exo sto createStore.js gia afto kai to exo vali se ksexoristo export oste na boro na to xrisimopio sto test mou. Episeis pao sto Utils folder kai ftiaxno ena function pou to leo testStore kai afto tha xrisimoios gia to test. Boro na pao sto 42:30 leptop tou video me ta 58 lepta gia na do to adistixo apospasma. Epidi afto to test afora polla pragrmata opos ta action to reduxs store kai ta reducers den exei logiki na to valo mesa se ena sigkekrimeno folder opos vazo ola ta ala tests mesa sto folder tou component pou kanoun test gia afto kai dimiourgo ena neo folder pou to leo integration tests

// epidi xrisimopio to axios xriazete na kano install ena acoma development depdenzie pou legete moxios kai o logos einai gia na boro na kano mock to respond pou tha eperna apo enan ipotithemeno server an xrisimopoiousa to axios

// npm install --save-dev moxios

// me to integration test pou eftiaksa ousistika kano test an to aciton pou exei to axios API call douelvie kala kai an to redux store meso tou reduxer giente sosta updated me ta data pou peno apo to axios request

// olo to test kai ta comments ine sto integrationTest.test.js file
