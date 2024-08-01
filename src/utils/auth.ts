export const signUp = async (id: string, password: string) => {
	const response = await fetch('/api/signup', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({ id, password }),
	});
  
	if (!response.ok) {
    throw new Error('Network response was not ok');
	}
  
	return response.json();
  };
  
  export const login = async (id: string, password: string) => {
	const response = await fetch('/api/login', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({ id, password }),
	});
  
	if (!response.ok) {
	  throw new Error('Network response was not ok');
	}
  
	return response.json();
  };
  