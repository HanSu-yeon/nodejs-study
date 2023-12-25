import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//엔티티 객체임을 알려주기 위한 데코레이터 -> 이걸 붙여줘야 다른 곳에 의존성 주입을 할 수 있다
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number; //id는 pk이며 자동 증가하는 값

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) //기본값을 넣어줌
  createdDt: Date = new Date();
}
