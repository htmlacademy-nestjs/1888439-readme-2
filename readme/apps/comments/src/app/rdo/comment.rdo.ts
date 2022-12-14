import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";


export class CommentRDO {
  @ApiProperty({
    description: 'Идентификатор комментария',
    example: 'e203b269-4b66-4e3f-acd3-7ce25e9828f5'
  })
  @Expose({name: '_id'})
  @Transform(({obj}) => obj._id.toString())
  id: string;

  @ApiProperty({
    description: 'Текст комментария',
    example: 'Hello, world!'
  })
  @Expose()
  text: string;

  @ApiProperty({
    description: 'Идентификатор автора',
    example: 'e203b269-4b66-4e3f-acd3-7ce25e9828f5'
  })
  @Expose()
  authorId: string;

  @ApiProperty({
    description: 'Идентификатор поста',
    example: 10
  })
  @Expose()
  postId: number;

  @ApiProperty({
    description: 'Дата создания',
    example: '2022-03-01T06:57:43.249Z'
  })
  @Expose()
  createdAt: string;
}
