---
title: React/Express CRUD Build
type: lesson
duration: "2:30"
creator:
    name: J Silverstein
    city: NY
competencies: Programming
---


# Let's CRUD!

### Learning Objectives

- Create a React/Express build
- Reuse components to create DRYer code
- CRUD!
- Profit
- FRIDAY

# Creating new ice creams!

Here's our pseudocode for this step:
- Add an `Add an ice cream!` button to our page
- When the user clicks the button, a form for adding an ice cream shows on the page
- The user can type information into the form. This is handled in the form's state.
- When the user submits the ice cream, the list of ice creams on the page is refreshed
- And, instead of showing the form, we show the button again.

We're going to need to create a new component, `IceCreamForm`.  This is going to be a component with state, since we'll need to handle the inputs. In App, we'll conditionally render the form based on whether or not a new value in state, `showAddForm`, is true or false. 

```jsx
{this.state.shouldShowAddForm 
    ? <IceCreamForm isAdd={true} /> 
    : <button onClick={this.showAddForm}>Add an Ice Cream!</button>
}
```

When the form submits, we'll make a post request back to the backend using fetch.

```js
iceCreamSubmit(event, data) {
    fetch('/api/icecream', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(res => res.json())
    .then(res => {
        this.getAllIceCreams();
    }).catch(err => console.log(err));
}
```

## 🚀 Lab 1
Follow the steps I just took  to get the app in `icecream-app-begin` working! Here's your setup steps:

- `cd` into `icecream-app-begin`
- run `npm install`
- `cd` into `client`
- run `npm install` (this one will take a while)
- run `npm run dev` in `icecream-app-begin`
- run `npm start` in `icecream-app-begin/client`
- get coding!

# Editing existing ice creams!

Instead of creating a brand new form component that'd look _overwhelmingly_ similar to our existing form component, we're going to modify the component so that it will also work for editing an ice cream.

Here's our pseudocode:
- Add a button to each individual ice cream that says "Edit Me!"
- When the button is clicked, that ice cream's value is set in state as the ice cream we're currently editing. 
- As the page rerenders, that ice cream in the list is replaced with an edit form, populated by values of that particular ice cream.
- When the edit form is submitted,
   - a PUT request is made to the server,
   - and the list of ice creams is refreshed!

We don't need to create a new component -- we'll just be working on the one that we already have.

We're going to add a method to `App`: `setEditing`. It's going to take an argument and set that ID in state, and we'll pass that value down to the `IceCreamList` component. Then, we're going to modify our `IceCreamList` component so that if the `currentlyEditing` value is the same as the id of the ice cream we're currently on, we're going to return the form component instead of the `IceCream` component.

Then, we're passing the ice cream into the form component, and setting the initial values of all the form fields with the props. To do this, we need to pass the props into the constructor:

```js
constructor(props) {
    super(props);
    this.state = {
        flavor: props.icecream ? props.icecream.flavor : '',
        description: props.icecream ? props.icecream.description : '',
        rating: props.icecream ? props.icecream.rating : '',
        brand: props.icecream ? props.icecream.brand : '',
        url: props.icecream ? props.icecream.url : '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
}
```

Then, we need to change the `iceCreamSubmit` method so that it'll work for the edit form as well. Here's what it'll look like:

```js
  iceCreamSubmit(method, event, data, id) {
    event.preventDefault();
    fetch(`/api/icecream/${id || ''}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => res.json())
      .then(res => {
        this.getAllIceCreams();
      });
  }
```

And last but not least, some conditional logic for our form, and a new prop: `isAdd`, a boolean true or false, depending on whether or not the form is an add form.

```jsx
<form className={this.props.isAdd ? 'addform' : 'editform'}
    onSubmit={this.props.isAdd
        ? e => this.props.iceCreamSubmit('POST', e, this.state)
        : e => this.props.iceCreamSubmit('PUT', e, this.state, this.props.icecream.id)}>
```

## 🚀 Lab 2

Get caught up in your own version of the app!

# Deleting ice creams :(

Easy peasy.

- Add a button that says "Delete Me :(" to each ice cream.
- When the button is clicked,
    - a delete request is made to the server
    - and the list of ice creams is refreshed!

## 🚀 Lab 3

Get caught up in your own version of the app!

# Recap!

- Reusing components is cool