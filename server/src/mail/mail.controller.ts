import { MailService } from './mail.service';
import {
  Controller,
  Get,
  HttpCode,
  Param,
  HttpStatus,
  Redirect,
} from '@nestjs/common';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  /* @Get(':link')
  @HttpCode(HttpStatus.OK)
  @Redirect(process.env.CLIENT_URL, 301)
  activate(@Param('link') link: string) {
    return this.mailService.activate(link);
  } */
}
