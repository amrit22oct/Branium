import React from 'react';
import Input from '../atoms/Input.jsx';
import Button from '../atoms/Button.jsx';

const AuthForm = ({ onSubmit, email, setEmail, password, setPassword, buttonText }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit">{buttonText}</Button>
    </form>
  );
};

export default AuthForm;
