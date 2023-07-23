function RoleList({ roles }) {
  
        // const rolesArr = [...roles];
        // console.log(rolesArr)

        // console.log(roles.name)
        // console.log(roles)
        
          const rolesEl = roles.map((role) => (
            <option value={role.name} key={role.id}>
              {role.name}
            </option>
          ));
          return rolesEl;
    
    
}

export default RoleList;
