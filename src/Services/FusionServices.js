
const FUSION_TABLES = {
  'countyByAge': {
    '5': '1bnOARfi--jQSVa1Df4uyJDdSDlqj4LyIPmo6Je_6',
    '10': '1FUVNVv1JbxmZR7OLK5PCJ6ZcDRZWd4oTitAebvzJ',
    '15': '1EQkSZRD-USnAzXkK2gkRNvXb0fWD3Ch3RZfxy5mw',
    '20': '1cx2eC0QD7w3JOX7z1u82oYJLrMZ0FSsAdJS4dzXN',
    '25': '19DgMjUz7i5TbXrgsX_rHrpidiGGo1cjQosRMtjJ4',
    '30': '1vglSvlELJijAWlL6UHmWbiBUrEZtXm3YUmPRqz8L',
    '35': '13AzPEQ-YJc0WZ4eAqCzlXedh8uV8J4tzuOo_3r0h',
    '40': '1ROYqpLBpbQk48XRyT8v281ifUMp6L26gl9-kwkH6',
    '45': '1EgfuHczBYfBjB6e4AuhAQA19ihk_29xR_KDJfeRd',
    '50': '1tu9sWrQQb4aROUMVOwbgsobB8-p0Wj44f_R8353M',
    '55': '1nACiz7QNWR60aQSKjkvaJQveVlgrZUW870jhA-p1',
    '60': '1S-JePKA10yzDNGC8dNzIywnGphs-EC3sOJY1gV0f',
    '65': '1KWjOglFNReDNUcTgRp7KidJ2KfADju42gE0d3p2I',
    '70': '119x_XK3Sm5XZ_PgoO9KkLlLlFVKT1y3RhwCNF7jD',
    '75': '1jx13KT_TH32xd3Y1gjw0_Xx7I_6X85PYftxP82LJ',
    '80': '1-ARjtLUuLWXnPDW1nvkvWc--4d1S-uGN4JnqVVMn',
    '85': '1Ax-0ec7bfZEsEShhwQw4oLb-JHDXvrlE1cWEs5Qe'
  }
}

function columnByAgeConverter (year) {
  const numberStrings = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  const stringYear = `${year}`
  return `${numberStrings[stringYear[0]]}${numberStrings[stringYear[1]]}${numberStrings[stringYear[2]]}${numberStrings[stringYear[3]]}`
}

function FusionServices (table) {
  this.table = table
  this.column = (value) => {
    switch (this.table) {
      case 'countyByAge':
        const column = columnByAgeConverter(value)
        return column
      default:
        return value
    }
  }

  this.from = (age) => {
    const from = FUSION_TABLES[this.table][age]
    console.log(from)
    return from
  }
}

export default FusionServices
