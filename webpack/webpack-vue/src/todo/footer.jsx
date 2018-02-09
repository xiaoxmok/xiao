import '../assets/style/footer.styl'
export default {
    data() {
      return {
          author: 'xiaoxm'
      }
    },
    render() {
        return (
            <div id="footer">
                <span>Wrtten by {this.author}</span>
            </div>
        )
    }
}