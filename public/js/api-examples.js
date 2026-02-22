// Example: How to call API from frontend (JavaScript)

// LOGIN API CALL
async function loginUser(email, password) {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Login successful:', data.user);
      // Redirect to dashboard or home page
      window.location.href = '/dashboard';
    } else {
      console.error('Login failed:', data.error);
      alert(data.error);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during login');
  }
}

// SIGNUP API CALL
async function signupUser(email, password, confirmPassword) {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        confirmPassword: confirmPassword
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Signup successful:', data.user);
      alert('Signup successful! Please login.');
      window.location.href = '/auth/login';
    } else {
      console.error('Signup failed:', data.error);
      alert(data.error);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during signup');
  }
}

// LOGOUT API CALL
async function logoutUser() {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST'
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Logout successful');
      window.location.href = '/auth/login';
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// GET CURRENT USER
async function getCurrentUser() {
  try {
    const response = await fetch('/api/auth/user');
    const data = await response.json();
    
    if (data.success) {
      console.log('Current user:', data.user);
      return data.user;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// VIEW REVIEW PAGE
function viewReviewPage() {
  window.location.href = '/auth/review';
}

// EXAMPLE: Add this to your login form in HTML
/*
<form onsubmit="handleLoginSubmit(event)">
  <input type="email" id="email" placeholder="Email" required>
  <input type="password" id="password" placeholder="Password" required>
  <button type="submit">Login</button>
</form>

<script>
function handleLoginSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  loginUser(email, password);
}
</script>

// To view the review page:
<button onclick="viewReviewPage()">View Review</button>
*/
