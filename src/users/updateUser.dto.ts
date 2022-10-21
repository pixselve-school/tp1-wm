import { ApiProperty } from '@nestjs/swagger';

export class UpdateUser {
  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
    type: String,
    required: false
  })
  lastname?: string;
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
    type: String,
    required: false
  })
  firstname?: string;
  @ApiProperty({
    description: 'The age of the user',
    example: 42,
    type: Number,
    required: false
  })
  age?: number;
}
