import React from 'react';
import axios from 'axios';
import {
  Button, Divider, Segment, Grid, FormInput, Form,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import * as Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
import Footer from '../components/Shared/Footer';
import LandingNavBar from '../components/Shared/LandingNavBar';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(e) {
    // call function here
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    const user = {
      'user': {
        username,
        email,
        password,
      },
    };
    if (password === password2) {
      axios
        .post('http://localhost:3001/api/user/register', user)
        .then(() => console.log('User created.'))
        .catch((err) => console.log(err.message));
    } else {
      Swal.fire({
        title: 'Passwords do not match',
        icon: 'error',
      });
    }
  }

  render() {
    const {
      username, email, password, password2,
    } = this.state;
    return (
      <>
        <LandingNavBar/>

        <Segment placeholder>
          <Grid columns={2} relaxed="very" stackable>
            <Grid.Column>
              <Form className="ui form" onSubmit={this.handleSubmit}>
                <FormInput
                  value={username}
                  onChange={this.onChange}
                  name="username"
                  icon="user"
                  iconPosition="left"
                  label="Username"
                  placeholder="Username"
                />
                <FormInput
                  value={email}
                  onChange={this.onChange}
                  name="email"
                  icon="mail"
                  iconPosition="left"
                  label="Email"
                  placeholder="Email"
                />
                <FormInput
                  value={password}
                  onChange={this.onChange}
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  label="Password"
                  placeholder="Password"
                />
                <FormInput
                  value={password2}
                  onChange={this.onChange}
                  name="password2"
                  icon="lock"
                  iconPosition="left"
                  label="Confirm Password"
                  placeholder="Password"
                />
                <Button type="submit">Submit</Button>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Button as={NavLink} to="/login" style={{ margin: '13em 7em', padding: '1em 3em' }}>Sign in</Button>
            </Grid.Column>
          </Grid>
          <Divider vertical>Or</Divider>
        </Segment>

        <Footer/>
      </>
    );
  }
}

export default Register;
