const path = require('path');
const nixt = require('nixt');

describe('typosquotter', function() {
  it('throw error when no input', function(done) {
    nixt()
      .run('node ./index.js')
      .stderr(/The domain name is required/)
      .end(done);
  });

  it('print to stdout by default', function(done) {
    nixt()
      .expect(function(result) {
        expect(result.stdout).not.toEqual("");
        expect(result.stdout).toMatch("vowelswap");
        expect(result.stdout).toMatch("omission");
      })
      .run('node ./index.js amazon.com')
      .end(done);
  });

  it('support flatten option', function(done) {
    nixt()
      .expect(function(result) {
        expect(result.stdout).not.toMatch("vowelswap");
        expect(result.stdout).not.toMatch("omission");
      })
      .run('node ./index.js amazon.com -f')
      .end(done);
  });

  it('support output as text', function(done) {
    nixt()
      .cwd(path.resolve(__dirname, 'output'))
      .run('node ../index.js amazon.com -t text -w')
      .stdout(/Output saved to/)
      .exist('./output/amazon.com.txt')
      .unlink('./output/amazon.com.txt')
      .end(done);
  });

  it('support output as json', function(done) {
    nixt()
      .cwd(path.resolve(__dirname, 'output'))
      .run('node ../index.js amazon.com -w')
      .stdout(/Output saved to/)
      .exist('./output/amazon.com.json')
      .unlink('./output/amazon.com.json')
      .end(done);
  });

  it('write result to file with custom name', function(done) {
    nixt()
      .cwd(path.resolve(__dirname, 'output'))
      .run('node ../index.js amazon.com -w ammazon.com')
      .stdout(/Output saved to/)
      .exist('./output/ammazon.com.json')
      .unlink('./output/ammazon.com.json')
      .end(done);
  });
});
