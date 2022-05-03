class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :username, :password_digest
end
