import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

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
  getAll() {
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

  @Post()
  createContacts(@Body() body) {
    let ids = this.contacts.map((c) => c.id);
    let newId = 1 + Math.max(...ids);
    let out = null;

    if (body instanceof Array) {
      let contacts = body;
      contacts.forEach((c, i) => (c.id = newId + i));
      this.contacts.push(...contacts);
      out = contacts;
    } else {
      let contact = body;
      contact.id = newId;
      this.contacts.push(contact);
      out = contact;
    }

    return out;
  }

  @Put('/:id')
  updateContact(@Param('id') id, @Body() contact) {
    let index = this.contacts.findIndex((c) => c.id == id);
    if (index === -1) {
      throw new NotFoundException();
    }

    contact.id = parseInt(id);
    this.contacts[index] = { ...contact };
    return contact;
  }
}
