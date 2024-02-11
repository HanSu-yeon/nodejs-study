const express = require('express');
const db = require('./models');
const app = express();

const User = db.users;

// db.sequelize.sync({ force: true }).then(() => {
//   console.log('데이터베이스 drop 및 sync 다시 맞춤');
// });

app.use(express.json());

app.post('/users', (req, res) => {
  const { firstName, lastName, hasCar } = req.body;

  const user = {
    firstName: firstName,
    lastName: lastName,
    hasCar: hasCar,
  };

  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || '유저 생성하는데 에러가 발생',
      });
    });
});

app.get('/users', (req, res) => {
  User.findAll()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || '유저 정보를 가져오는데 실패',
      });
    });
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then(user => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({
          message: `id가 ${id}인 유저가 없다`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || `${id}인 유저를 찾는데 에러가 났음`,
      });
    });
});

app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id },
  })
    .then(num => {
      //num[0]===1 => 깔끔하게 하기 위해서 아래처럼
      if (num == 1) {
        res.send({
          message: 'User was updated successfully',
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updaing User with id=' + id,
      });
    });
});

app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: '유저가 성공적으로 삭제되었습니다',
        });
      } else {
        res.send({
          message: `${id}유저를 찾지 못했습니다`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || `${id} 유저를 삭제하는데 실패`,
      });
    });
});
const PORT = 4000;
app.listen(PORT, () => {
  console.log('4000번 포트에서 서버가 실행');
});
