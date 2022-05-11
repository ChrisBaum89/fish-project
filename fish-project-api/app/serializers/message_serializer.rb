class MessageSerializer
  include FastJsonapi::ObjectSerializer
  attributes :firstname, :lastname, :email, :phonenumber, :messagetext
end
