import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Container, Form, Grid, Header, Message, Segment,
} from 'semantic-ui-react';
import axios from 'axios';
import * as Swal from 'sweetalert2';
import LandingNavBar from '../components/Shared/LandingNavBar';
import Footer from '../components/Shared/Footer';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirectToReferer: false,
    };
  }

  handleChange = (e) => {
    const change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    axios
      .post(
        'http://localhost:3001/api/user/login',
        {
          'user': {
            email,
            password,
          },
        },
      )
      .then((response) => {
        window.localStorage.setItem('user-token', response.data.user.token);
        this.setState({ redirectToReferer: true });
      })
      .catch((err) => {
        Swal.fire({
          title: 'Failed to Login',
          icon: 'error',
          text: `${err.message}`,
        });
      });
  };

  render() {
    const { redirectToReferer } = this.state;
    const pathname = '/calculator';
    const { from } = { from: { pathname } };
    // If user is authenthicated properly, redirect to the Barbell Calculator Page
    if (redirectToReferer) {
      return <Redirect to={from}/>;
    }
    const containerStyle = { marginTop: 15 };

    return (
      <>
        <LandingNavBar/>

        <Container style={containerStyle}>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                Login to your account
              </Header>
              <Form onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                    label="Email"
                    icon="user"
                    iconPosition="left"
                    name="email"
                    type="email"
                    placeholder="E-mail address"
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    label="Password"
                    icon="lock"
                    iconPosition="left"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={this.handleChange}
                  />
                  <Form.Button content="Submit"/>
                </Segment>
              </Form>
              <Message>
                <Link to="/register">Click here to Register</Link>
              </Message>
            </Grid.Column>
          </Grid>
        </Container>

        <Footer/>
      </>
    );
  }
}
