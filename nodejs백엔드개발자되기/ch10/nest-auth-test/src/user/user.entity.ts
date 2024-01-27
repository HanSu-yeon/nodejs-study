import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//엔티티 객체임을 알려주기 위한 데코레이터 -> 이걸 붙여줘야 다른 곳에 의존성 주입을 할 수 있다
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number; //id는 pk이며 자동 증가하는 값

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true }) //패스워드에 빈 값 허용
  password: string;

  @Column()
  username: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) //기본값을 넣어줌
  createdDt: Date = new Date();

  @Column({ nullable: true }) //providerId에 빈 값 허용
  providerId: string;
}
