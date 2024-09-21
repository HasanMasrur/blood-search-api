
    function bloodGroupName( value) {
        switch (value) {
          case 'O': 
            return 'O+';
          case 'B': 
            return 'B+';
          case 'A':
            return 'A+';
          case 'AB': 
            return 'A+';
          case 'O-': 
            return 'O-';
          case 'B-': 
            return 'B-';
          case 'A-': 
            return 'A-';
          case 'AB-': 
            return 'AB-';
          default:
            return ''
        }
        }
