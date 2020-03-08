import React from 'react';
import {
  Button, Divider, Segment, Grid, FormInput, Form,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
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

  handleSubmit(e) {
    // call function here
    e.preventDefault();
    const {
      fname, lname, email, password, password2,
    } = this.state;
    if (password === password2) {
      // Encrypt password here
    } else {
      console.log('passwords dont match');
    }
  }

  render() {
    const {
      fname, lname, email, password, password2,
    } = this.state;
    return (
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Form className="ui form" onSubmit={this.handleSubmit}>
              <FormInput value={fname} onChange={this.onChange} name="fname" type="text" id="form" icon="user" iconPosition="left" label="First Name" placeholder="First Name" />
              <FormInput value={lname} onChange={this.onChange} name="lname" icon="user" iconPosition="left" label="Last Name" placeholder="Last Name" />
              <FormInput value={email} onChange={this.onChange} name="email" icon="mail" iconPosition="left" label="Email" placeholder="Email" />
              <FormInput value={password} onChange={this.onChange} name="password" icon="lock" iconPosition="left" label="Password" placeholder="Password" />
              <FormInput value={password2} onChange={this.onChange} name="password2" icon="lock" iconPosition="left" label="Confirm Password" placeholder="Password" />
              <Button type="submit">Submit</Button>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Button style={{ margin: '13em 7em', padding: '1em 3em' }}>Register</Button>
          </Grid.Column>
        </Grid>
        <Divider vertical>Or</Divider>
      </Segment>
    );
  }
}

export default Register;
