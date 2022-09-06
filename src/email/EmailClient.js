const sgMail = require("@sendgrid/mail");
const client = require("@sendgrid/client");

class Email {
  constructor(apiKey) {
    this.client = client;
    this.apiKey = apiKey;
    this.versionId = null;
    this.client.setApiKey(this.apiKey);
  }

  // creating attachment payload
  transformImage = (url) => {
    const image = {};
    image.content = url.split("base64,")[1];
    image.filename = url.split("/").pop();
    image.type = "image/png";
    image.content_id = image.filename;
    image.disposition = "inline";

    return image;
    }

  // function to get all template ids
  async getTemplateIds() {
    const request = {
      url: "/v3/templates?generations=dynamic",
      method: "GET",
    };
    const message = await client.request(request);
    return message;
  }

  async getTemplateIdsList() {
    const message = await this.getTemplateIds();
    return message[0].body.templates;
  }

  async getTemplate(templateId, versionId) {
    const request = {
      url: `/v3/templates/${templateId}/versions/${versionId}`,
      method: "GET",
    };

    const message = await client.request(request);

    return message;
  }

  // Get html content of the template - active version
  async getTemplateHTML(templateId, versions) {
    var versionId = undefined;

    for (var i = 0; i < versions.length; i++) {
      if (versions[i].active === 1) {
        console.log(`active version: ${versions[i].id}`);
        versionId = versions[i].id;
      }
    }
    if (versionId === undefined) {
      console.log(versionId);
      // versionId = this.versionId;
      versionId = versions[0].id;
    }

    const message = await this.getTemplate(templateId, versionId);
    return message[0].body.html_content;
  }

  //  Updating Template/ Creating new template versions
  async updateTemplateHTML(templateId, template) {
    const data = {
      active: 1,
      name: "Current Version",
      html_content: template,
      generate_plain_content: true,
      subject:
        "{{static_district}} - {{static_number_of_indicators}} CEHS indicators in {{dynamic_reporting_month}}",
      editor: "code",
    };

    const request = {
      url: `/v3/templates/${templateId}/versions`,
      method: "POST",
      body: data,
    };

    this.client
      .request(request)
      .then(([response]) => {
        console.log("OK", response.statusCode);
        console.log(response.body);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //  Create new templates
  newTemplate(templateName) {
    const data = {
      name: templateName,
      generation: "dynamic",
    };

    const request = {
      url: `/v3/templates`,
      method: "POST",
      body: data,
    };

    this.client
      .request(request)
      .then(([response]) => {
        console.log(response.statusCode);
        console.log(response.body);
        this.updateTemplateHTML(response.body.id, "New version");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // delete template
  deleteTemplate(templateId) {
    const request = {
      url: `/v3/templates/${templateId}`,
      method: "DELETE",
    };

    client
      .request(request)
      .then(([response, body]) => {
        console.log(response.statusCode);
        console.log(response.body);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Get the list of variables in the active template
  async getTemplateVariables(templateId) {
    const request = {
      url: `/v3/templates/${templateId}`,
      method: "GET",
    };

    const data = await client.request(request);
    const versions = data[0].body.versions;

    const message = await this.getTemplateHTML(templateId, versions);

    var re = /({{([^}]+)}})/g;
    var variablesArray = message.match(re);

    let uniqueChars = [];
    if (variablesArray) {
      variablesArray.forEach((c) => {
        if (!uniqueChars.includes(c)) {
          uniqueChars.push(c);
        }
      });
    }

    const variables = uniqueChars.map((item) =>
      item.replace("}}", "").replace("{{", "")
    );

    return variables;
  }

  // Send email
  sendEmail(address, templateId, templateVariables, attachments) {
    sgMail.setApiKey(this.apiKey);

    const msg = {
      to: address,
      from: { name: "Assumpta Wanyama", email: "assumpta.wanyama@dalberg.com" },
      templateId,
      dynamicTemplateData: templateVariables,
      attachments,
    };

    console.log(msg.templateId);
    console.log(msg.to);

    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

const EmailClient = new Email(
  "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"
);

export default EmailClient;
