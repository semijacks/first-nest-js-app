import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

@Controller('contacts')
export class ContactsController {
  contacts = [
    {
      id: 1,
      name: 'Semilore',
      email: 'semi@gmail.com',
    },
    {
      id: 2,
      name: 'Lase',
      email: 'lase@gmail.com',
    },
    {
      id: 3,
      name: 'Badoo',
      email: 'badoo@gmail.com',
    },
    {
      id: 4,
      name: 'Shini',
      email: 'shini@gmail.com',
    },
  ];

  @Get()
  getAll(): object {
    return [this.contacts];
  }

  @Get('/:contactId')
  getOne(@Param('contactId') id: number) {
    let c = this.contacts.find((c1) => c1.id == id);

    if (!c) {
      throw new NotFoundException();
    }

    return { ...c };
  }
}
