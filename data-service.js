const Sequelize = require('sequelize');

var sequelize = new Sequelize('d16i2cueoln2am', 'fhfdcswrkwgayn', 'cccb9ae2bbde3a0945269c3b48de334af55aa8c2470ba9810b627009d2e04d63', {
    host: 'ec2-107-20-251-130.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: true
    }
});

var Employee = sequelize.define('Employee', {
    employeeNum: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    maritalStatus: Sequelize.STRING,
    isManager: Sequelize.BOOLEAN,
    employeeManagerNum: Sequelize.INTEGER,
    status: Sequelize.STRING,
    hireDate: Sequelize.STRING
});

var Department = sequelize.define('Department', {
    departmentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    departmentName: Sequelize.STRING
});

Department.hasMany(Employee, { foreignKey: 'department' });

module.exports.initialize = () => {
    return new Promise((resolve, reject) => {
        sequelize.sync()
            .then(() => resolve())
            .catch(() => reject("unable to sync the database"));
    });
};

////////// Employees Related ///////////////////////////////

module.exports.addEmployee = (employeeData) => {
    employeeData.isManager = (employeeData.isManager) ? true : false;
    for (eachRow in employeeData) {
        if (eachRow == "") {
            eachRow = null;
        }
    }
    return new Promise((resolve, reject) => {
        Employee.create(employeeData)
            .then(() => resolve())
            .catch(() => reject("unable to create employee"))
    });
};

module.exports.getAllEmployees = () => {
    return new Promise((resolve, reject) => {
        Employee.findAll()
            .then(() => resolve(Employee.findAll()))
            .catch(() => reject("no results returned"));
    });
};

module.exports.getEmployeesByDepartment = (department) => {
    return new Promise((resolve, reject) => {
        Employee.findAll({
            where: { department: department }
        })
            .then(() => resolve(Employee.findAll({
                where: { department: department }
            })))
            .catch(() => reject("no results returned"));
    });
};

module.exports.getEmployeesByManager = (manager) => {
    return new Promise((resolve, reject) => {
        Employee.findAll({
            where: { employeeManagerNum: manager }
        })
            .then(() => resolve(Employee.findAll({
                where: { employeeManagerNum: manager }
            })))
            .catch(() => reject("no results returned"));
    });
};

module.exports.getEmployeeByNum = (num) => {
    return new Promise((resolve, reject) => {
        Employee.findAll({
            where: { employeeNum: num }
        })
            .then(() => resolve(Employee.findAll({
                where: { employeeNum: num }
            })))
            .catch(() => reject("no results returned"))
    });
}

module.exports.getEmployeesByStatus = (status) => {
    return new Promise((resolve, reject) => {
        Employee.findAll({
            where: { status: status }
        })
            .then(() => resolve(Employee.findAll({
                where: { status: status }
            })))
            .catch(() => reject("no results returned"));
    });
};

module.exports.updateEmployee = (employeeData) => {
    employeeData.isManager = (employeeData.isManager) ? true : false;
    for (eachRow in employeeData) {
        if (eachRow == "") {
            eachRow = null;
        }
    }
    return new Promise((resolve, reject) => {
        Employee.update(employeeData, {
            where: { employeeNum: employeeData.employeeNum }
        })
            .then(() => resolve(Employee.update(employeeData, {
                where: { employeeNum: employeeData.employeeNum }
            })))
            .catch(() => reject("unable to update employee"));
    });
};

module.exports.deleteEmployeeByNum = (empNum) => {
    return new Promise((resolve, reject) => {
        Employee.destroy(
            { where: { employeeNum: empNum } })
            .then(() => resolve(Employee.destroy({
                where: { employeeNum: empNum }
            })))
            .catch(() => reject("unable to delete employee"))
    });
};


////////// Departments Related ///////////////////////////////

module.exports.addDepartment = (departmentData) => {
    for (eachRow in departmentData) {
        if (eachRow == "") {
            eachRow = null;
        }
    }
    return new Promise((resolve, reject) => {
        Department.create(departmentData)
            .then(() => resolve())
            .catch(() => reject("unable to create department"));
    });
};

module.exports.getDepartments = () => {
    return new Promise((resolve, reject) => {
        Department.findAll()
            .then(() => resolve(Department.findAll()))
            .catch(() => reject("no results returned"));
    });
};

module.exports.getDepartmentById = (id) => {
    return new Promise((resolve, reject) => {
        Department.findAll({
            where: { departmentId: id }
        })
            .then(() => resolve(Department.findAll({
                where: { departmentId: id }
            })))
            .catch(() => reject("no results returned"));
    });
};

module.exports.updateDepartment = (departmentData) => {
    for (eachRow in departmentData) {
        if (eachRow == "") {
            eachRow = null;
        }
    }
    return new Promise((resolve, reject) => {
        Department.update(departmentData, {
            where: { departmentId: departmentData.departmentId }
        })
            .then(() => resolve(Department.update(departmentData, {
                where: { departmentId: departmentData.departmentId }
            })))
            .catch(() => reject("unable to update department"));
    });
};

module.exports.deleteDepartmentById = (id) => {
    return new Promise((resolve, reject) => {
        Department.destroy({
            where: { departmentId: id }
        })
            .then(() => resolve(Department.destroy({
                where: { departmentId: id }
            })))
            .catch(() => reject("unable to delete department"));
    });
};
